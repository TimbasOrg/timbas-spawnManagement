
local function freezePlayer(id, freeze)
	local player = id
	SetPlayerControl(player, not freeze, false)

	local ped = GetPlayerPed(player)

	if not freeze then
			if not IsEntityVisible(ped) then
					SetEntityVisible(ped, true)
			end

			if not IsPedInAnyVehicle(ped) then
					SetEntityCollision(ped, true)
			end

			FreezeEntityPosition(ped, false)
			--SetCharNeverTargetted(ped, false)
			SetPlayerInvincible(player, false)
	else
			if IsEntityVisible(ped) then
					SetEntityVisible(ped, false)
			end

			SetEntityCollision(ped, false)
			FreezeEntityPosition(ped, true)
			--SetCharNeverTargetted(ped, true)
			SetPlayerInvincible(player, true)
			--RemovePtfxFromPed(ped)

			if not IsPedFatallyInjured(ped) then
					ClearPedTasksImmediately(ped)
			end
	end
end

function SpawnPlayer(spawnCoords, model)
	Citizen.CreateThread(function()
		if not spawnCoords then
			-- print(spawnCoords)
			Citizen.Trace('spawnPlayer: Coordenadas de spawn inválidas')
			return
		end
		
		if not IsScreenFadedOut() then
			DoScreenFadeOut(500)
	
			while not IsScreenFadedOut() do
				Citizen.Wait(0)
			end 
		end

		
		freezePlayer(PlayerId(),true)

		if model then
			RequestModel(model)

			while not HasModelLoaded(model) do
				RequestModel(model)
				Citizen.Wait(0)
			end

			SetPlayerModel(PlayerId(), model)

			SetModelAsNoLongerNeeded(model)
		end

		RequestCollisionAtCoord(spawnCoords.x, spawnCoords.y, spawnCoords.z)

		-- Obtendo a entidade do player
		local playerPed = PlayerPedId()

		SetEntityCoordsNoOffset(playerPed, spawnCoords.x, spawnCoords.y, spawnCoords.z, false, false, true)

		NetworkResurrectLocalPlayer(spawnCoords.x, spawnCoords.y, spawnCoords.z, -30.0, true, false)

		ClearPedTasksImmediately(playerPed)
		RemoveAllPedWeapons(playerPed)
		ClearPlayerWantedLevel(PlayerId())

		local currentTime = GetGameTimer()

		while (not HasCollisionLoadedAroundEntity(playerPed) and (GetGameTimer() - currentTime) < 5000) do
			Citizen.Wait(0)
		end

		ShutdownLoadingScreen()

		if IsScreenFadedOut() then
			DoScreenFadeIn(500)
	
			while not IsScreenFadedIn() do
				Citizen.Wait(0)
			end 
		end

		freezePlayer(PlayerId(),false)

		TriggerEvent('PlayerSpawned', spawnCoords.x, spawnCoords.y, spawnCoords.z, 0, 0, model)



	end)
end

--Criar função que carrega o player no aeroporto com a camera no ar somente, quando o player apertar o botão de spawn, ele irá spawnar no aeroporto
function setCam()
	local cam = CreateCam("DEFAULT_SCRIPTED_FLY_CAMERA", true)
	SetCamCoord(cam, 0.0, 0.0, 1000.0)
	SetCamRot(cam, -90.0, 0.0, 0.0)
	RenderScriptCams(true, false, 0, true, true)
end

RegisterNUICallback('timbas-spawnManagement:spawnPlayer', function(_, cb)
	toggleNuiFrame(false)
	SpawnPlayer(Config.spawnCoordsAirport, Config.defaultModel)
	cb(true)
  end)


AddEventHandler('onClientGameTypeStart', function()
	Citizen.CreateThread(function()
			Citizen.Wait(1000)
			toggleNuiFrame('setVisible', true)
	end)
end)

