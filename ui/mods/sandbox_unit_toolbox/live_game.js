;(function() {
  if (!model['serverSandboxState']) {
    model.serverSandboxState = ko.observable(false)
    model.serverSandboxState.subscribe(model.cheatAllowCreateUnit)
    model.serverSandboxState.subscribe(model.cheatAllowChangeVision)
    model.serverSandboxState.subscribe(model.cheatAllowChangeControl)

    var live_game_server_state = handlers.server_state
    handlers.server_state = function(msg) {
      live_game_server_state.apply(this, arguments)

      if (msg.data && msg.data.client && msg.data.client.game_options) {
        model.serverSandboxState(!!msg.data.client.game_options.sandbox)
      }
    }
  }
})()

;(function() {
  if (model['cheatAllowCreateUnit']) {
    model.sandbox(model.cheatAllowCreateUnit())
    model.cheatAllowCreateUnit.subscribe(model.sandbox)
  }

  model.sandboxHeight = function() {
    var scale = api.settings.getSynchronous('ui', 'ui_scale') || 1.0;
    // 32 for bottom bar
    return window.screen.availHeight/scale - $('#sandbox').offset().top - 32
  }

  var resized = function() {
    api.Panel.message('sandbox', 'sandbox_height', model.sandboxHeight())
  }

  $(window).resize(resized)

  handlers.request_sandbox_height = resized
})()
