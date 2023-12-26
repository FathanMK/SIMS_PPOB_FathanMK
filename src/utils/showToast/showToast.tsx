import {ReactNode} from 'react';

interface IShowToastProp {
  toast: {
    show: (props: any) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
  };
  renderContent: (props: any) => ReactNode;
}

export default function showToast({toast, renderContent}: IShowToastProp) {
  toast.show({
    placement: 'bottom',
    duration: 2000,
    render: renderContent,
  });
}
