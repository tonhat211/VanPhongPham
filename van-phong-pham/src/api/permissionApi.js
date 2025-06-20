import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';


export async function getAll() {
    console.log("permission api: getAll")
    let url = `/admin/permissions/all`;
    const params = {  };
    // console.log(JSON.stringify(params,null,2));
    const response = await axiosInstance.post(url, { params });
    const data = response.data;
    if(data.success) {
        return  {
            success: data.success,
            employees: data.employees,
            permissions: data.permissions
        }
    }
    return false;
}

export async function getPermissionsOfEmployee({ id }) {
    console.log('getPermissionsOfEmployee: ' + id);
    const url = `/admin/permissions/employee/${id}`;
    const response = await axiosInstance.post(url);
    const data = response.data;

     if(data.success) {
        return  {
            success: data.success,
            permissions: data.permissions
        }
    }
    return false;
}

export async function getPermissionsNotOfEmployee({ id }) {
    console.log('getPermissions Not OfEmployee: ' + id);
    const url = `/admin/permissions/employee/not/${id}`;
    const response = await axiosInstance.post(url);
    const data = response.data;

     if(data.success) {
        return  {
            success: data.success,
            permissions: data.permissions
        }
    }
    return false;
}

export async function removePermission({ employeeId, permissionId }) {
    console.log('removePermission');
    let url = `/admin/permissions/employee/remove`;
    const params = { employeeId,permissionId };
    // console.log("params: " + JSON.stringify(params,null,2));
    const response = await axiosInstance.post(url, params);

    const data = response.data;

    const success = data.success;
    const resultPermissionId = data.permissionId;

    // console.log(JSON.stringify(product),null);

    return { success, permissionId: resultPermissionId };
}

export async function addPermission({ employeeId, permissionId }) {
    console.log('addPermission');
    let url = `/admin/permissions/employee/add`;
    const params = { employeeId,permissionId };
    // console.log("params: " + JSON.stringify(params,null,2));
    const response = await axiosInstance.post(url, params);

    const data = response.data;

    const success = data.success;
    const resultPermissionId = data.permissionId;

    // console.log(JSON.stringify(product),null);

    return { success, permissionId: resultPermissionId };
}


