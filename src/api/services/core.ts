import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_URL } from "../../const"
import { getAccessToken } from "../../utils"

export class ApiService {
  static get<ResponseType>(path: string, config?: AxiosRequestConfig<any>) {
    return axios.get<ResponseType>(`${API_URL}/${path}`, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }

  static post<DataType, ResponseType>(
    path: string,
    data: DataType,
    config?: AxiosRequestConfig<any>
  ) {
    return axios.post<DataType, AxiosResponse<ResponseType>>(
      `${API_URL}/${path}`,
      data,
      {
        ...config,
        headers: config?.headers ?? {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    )
  }

  static put<DataType, ResponseType>(
    path: string,
    data: DataType,
    config?: AxiosRequestConfig<any>
  ) {
    return axios.put<DataType, AxiosResponse<ResponseType>>(
      `${API_URL}/${path}`,
      data,
      {
        ...config,
        headers: config?.headers ?? {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    )
  }

  static delete<ResponseType>(path: string, config?: AxiosRequestConfig<any>) {
    return axios.delete<ResponseType>(`${API_URL}/${path}`, {
      ...config,
      headers: config?.headers ?? {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }
}
