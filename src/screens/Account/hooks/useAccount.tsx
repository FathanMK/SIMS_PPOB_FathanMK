import {useForm} from 'react-hook-form';
import useAppSelector from '../../../hooks/useAppSelector';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@tanstack/react-query';
import {axiosInstanceWAuth} from '../../../utils/axiosInstances';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {setUser} from '../../../slices/user/userSlice';

export default function useAccount() {
  const {user, token} = useAppSelector(state => state.user);
  const [imageFile, setImageFile] = useState<any>();
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });

  const updateNameMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstanceWAuth(token).put('/profile/update', data);
    },
    onSuccess: async () => {
      await axiosInstanceWAuth(token)
        .get('/profile')
        .then(response => {
          const {data} = response.data;
          dispatch(setUser(data));
        })
        .catch(error => console.log(error));
    },
    onError(error: any) {
      console.log(error.response.data);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: (formData: any) => {
      return axiosInstanceWAuth(token).put('/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: async () => {
      await axiosInstanceWAuth(token)
        .get('/profile')
        .then(response => {
          const {data} = response.data;
          dispatch(setUser(data));
        })
        .catch(error => console.log(error));
    },
    onError(error: any) {
      console.log(error.response.data);
    },
  });

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      value => {
        if (value.assets) {
          setImageFile(value.assets[0]);
        }
      },
    );
  };

  // FUNCTION THAT MAKES THE DATABASE ERROR, IM SORRY
  const handleUpdateProfile = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', {
        name: imageFile.fileName,
        uri: imageFile.uri,
        type: imageFile.type,
      });
      updateImageMutation.mutate(formData);
    }

    const newName = {
      first_name: watch('firstName'),
      last_name: watch('lastName'),
    };
    updateNameMutation.mutate(newName);
  };

  const handleEditMode = () => {
    setEditMode(!isEditMode);
    setImageFile('');
  };

  return {
    control,
    user,
    errors,
    imageFile,
    handleOpenGallery,
    isEditMode,
    handleEditMode,
    handleUpdateProfile,
  };
}
