function SendReactMessage(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end

function toggleNuiFrame(bool)
  SetNuiFocus(bool, bool)
  SendReactMessage('setVisible', bool)
end


