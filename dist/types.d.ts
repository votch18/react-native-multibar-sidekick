/// <reference types="react" />
export declare type MultiBarOverlayProps = {
    iconWidth?: number;
    iconHeight?: number;
    overlayWidth?: number;
    overlayHeight?: number;
    expandingMode?: 'staging' | 'flat';
    overlayBackground?: string;
};
export declare type MultiBarPassThroughParams = {
    params?: any;
};
export declare type MultiBarExtrasRender = (props: MultiBarPassThroughParams) => React.ReactNode;
export declare type MultiBarContextProps = {
    data: MultiBarExtrasRender[];
    extrasVisible: boolean;
    overlayProps?: MultiBarOverlayProps;
    setExtrasVisible: (visible: boolean) => void;
};
