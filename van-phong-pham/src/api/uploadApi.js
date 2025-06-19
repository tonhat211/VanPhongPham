import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

export async function uploadThumbnail({ thumbnail }) {
    console.log('upload');
    let url = `/files/upload/thumbnail`;
    const formData = new FormData();
    formData.append('file', thumbnail);
    const response = await axiosInstance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const data = response.data;

    const image = {
        id: data.id,
        name: data.name,
    };
    // console.log(JSON.stringify(image, null, 2));
    return image;
}

export async function uploadImageList({ id, files }) {
    console.log('uploadImageList:');
    let url = `/admin/products/edit/image/insert`;
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f.file));
    formData.append('id', id);
    const response = await axiosInstance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const data = response.data;
    const success = data.success;

    if (success) {
        const images = Array.isArray(data.images)
            ? data.images.map((img) => ({
                  ...img,
                  url: `${SERVER_URL_BASE}/${img.name}`, 
              }))
            : [];

        return { success, images };
    } else return success;
}

export async function uploadImage({ id, file }) {
    console.log('uploadImage:');
    let url = `/admin/products/edit/thumbnail/insert`;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file.file)

    const response = await axiosInstance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const data = response.data;
    const success = data.success;
    console.log(JSON.stringify(data.images, null, 2));

    if (success) {
       const image = data.image
            ? {
                  ...data.image,
                  url: `${SERVER_URL_BASE}/${data.image.name}`,
              }
            : null;
        return { success, image };
    } else return success;
}