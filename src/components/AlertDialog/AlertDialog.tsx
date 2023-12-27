import {
  AlertDialog as GluestackAlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogBody as GluestackAlertDialogBody,
  AlertDialogFooter as GluestackAlertDialogFooter,
} from '@gluestack-ui/themed';
import {ReactNode} from 'react';

function AlertDialog({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  return (
    <GluestackAlertDialog isOpen={isOpen}>
      <AlertDialogBackdrop />
      <AlertDialogContent>{children}</AlertDialogContent>
    </GluestackAlertDialog>
  );
}

function AlertDialogBody({children}: {children: ReactNode}) {
  return (
    <GluestackAlertDialogBody contentContainerStyle={{alignItems: 'center'}}>
      {children}
    </GluestackAlertDialogBody>
  );
}

function AlertDialogFooter({children}: {children: ReactNode}) {
  return (
    <GluestackAlertDialogFooter alignItems="center" justifyContent="center">
      {children}
    </GluestackAlertDialogFooter>
  );
}

export {AlertDialog, AlertDialogBody, AlertDialogFooter};
