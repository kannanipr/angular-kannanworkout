import { Observable, Subject } from "rxjs";

export interface ConfirmationModal {
    title: string;
    message: string;
}

export interface ModalConfig {
    type: string;
    confirmationModalConfig?: ConfirmationModal;
}

export interface ActionConfigMap {
    config: ModalConfig;
    action: Subject<ModalAction>;
}

export interface ModalAction {
    name: string;
    data?: any;
}