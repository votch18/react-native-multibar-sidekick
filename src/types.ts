export type MultiBarOverlayProps = {
  iconWidth?: number;
  iconHeight?: number;
  overlayWidth?: number;
  overlayHeight?: number;
  expandingMode?: 'staging' | 'flat',
  overlayBackground?: string;
};

export type MultiBarPassThroughParams = {
  params?: any;
};

export type MultiBarExtrasRender = (props: MultiBarPassThroughParams) => React.ReactNode;

export type MultiBarContextProps = {
  data: MultiBarExtrasRender[];
  extrasVisible: boolean;
  overlayProps?: MultiBarOverlayProps;
  setExtrasVisible: (visible: boolean) => void;
};
