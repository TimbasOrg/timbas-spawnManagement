import { useEffect, MutableRefObject, useRef } from "react";
import { NuiMessageData } from "./interfaces";
import { NuiHandlerType } from "./types";
import { noop } from "./misc";

export const captureNuiEvent = <T = any>(
  action: string,
  handler: (data: T) => void
) => {
  // Meio para evitar rederizações descenessárias.
  const allocatedHandler: MutableRefObject<NuiHandlerType<T>> = useRef(noop);

  // Atualizar o handler somente quando ele for alterado.
  useEffect(() => {
    allocatedHandler.current = handler;
  }, [handler]);

  // Responsável por ouvir os eventos do NUI.
  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { action: actionEvent, data: dataEvent } = event.data;
      if (allocatedHandler.current) {
        if (actionEvent === action) {
          allocatedHandler.current(dataEvent);
        }
      }
    };

    window.addEventListener("message", eventListener);

    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
