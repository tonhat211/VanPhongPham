import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

export async function uploadThumbnail({ thumbnail }) {
    console.log('upload');
    let url = `/files/upload/thumbnail`;
    const formData = new FormData();
    // formData.append('type', 'thumnail');
    formData.append('file', thumbnail);
    const response = await axiosInstance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const data = response.data;

    const image = {
        id: data.id,
        name: data.name,
    };
    console.log(JSON.stringify(image, null, 2));
    return image;
}

export async function uploadImageList({ imgs }) {
    console.log('upload');
    let url = `/files/upload/thumbnail`;
    const formData = new FormData();
    imgs.forEach((f) => formData.append('files', f));
    const response = await axiosInstance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const data = response.data;

    const images = data.map((item) => ({
        id: item.id,
        name: item.name,
    }));
    console.log(JSON.stringify(images, null, 2));
    return images;
}
