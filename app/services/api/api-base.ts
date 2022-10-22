import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {
  TDeleteOkResult,
  TDeleteResult,
  TGetOkResult,
  TGetResult,
  TListOkResult,
  TListResult,
  TPatchResult,
  TPostResult,
  TPutResult,
  TSaveOkResult,
} from "./api-types"

/**
 * RestApi 구현에 따라 다른 형태의 응답이 올 수 있으므로,
 * 이를 처리하기 위한 타입을 정의한다.
 *
 * get, list, post, put, patch, delete 메서드와 일치시킨다.
 *
 * `resultCode`는 RestApi 구현에서 헤더로 에러코드를 내리지 않고 별도 처리시 사용하는 코드이다.
 *
 */
export type TApiOkResponse<T> = {
  resultCode: "S"
  results: T | T[]
  info?: {
    count: number // 전체 개수
    pages: number // 전체 페이지 수
    amount?: number // 페이지당 개수
    page?: number // 현재 페이지
    next?: string | null // 다음 페이지 URL
    prev?: string | null // 이전 페이지 URL
  }
}

/**
 * RestApi 구현에 따라 다른 형태의 에러 응답이 올 수 있으므로,
 * 이를 처리하기 위한 타입을 정의한다.
 *
 * get, list, post, put, patch, delete 메서드와 일치시킨다.
 *
 * `resultCode`는 RestApi 구현에서 헤더로 에러코드를 내리지 않고 별도 처리시 사용하는 코드이다.
 */
export type TApiErrorResponse = {
  resultCode: "F"
  errorCode?: string
  name?: string
  message?: string
  detail?: any
}

export type TApiResponse<T> = TApiErrorResponse | TApiOkResponse<T>

/**
 * API의 기본 기능을 제공한다.
 *
 * 앱의 모든 API는 이 클래스를 상속받아 처리한다.
 */
export class ApiBase {
  protected api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * 목록 조회
   * @param url 조회 URL
   * @returns
   */
  async list<T>(url: string, params?: { [key: string]: any }): Promise<TListResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.get(url, params)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    const result = response.data as TApiOkResponse<T>
    return { kind: "ok", data: result.results, info: result.info } as TListOkResult<T>
  }

  /**
   * 단건 조회
   * @param url 조회 URL
   * @returns
   */
  async get<T>(url: string): Promise<TGetResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.get(url)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    const result = response.data as TApiOkResponse<T>
    return { kind: "ok", data: result } as TGetOkResult<T>
  }

  /**
   * 새로운 데이터 생성
   * @param url
   * @param data
   * @returns
   */
  async post<T>(url: string, data: T): Promise<TPostResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.post(url, data)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    const result = response.data as TApiOkResponse<T>
    return { kind: "ok", data: result } as TSaveOkResult<T>
  }

  /**
   * 단건 속성 전체 수정
   * data에 정의되지 않은 속성은 기본값으로 변경
   * @param url
   * @param data 저장할 모든 속성을 포함한 객체
   * @returns
   */
  async put<T>(url: string, data: T): Promise<TPutResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.put(url, data)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    const result = response.data as TApiOkResponse<T>
    return { kind: "ok", data: result } as TSaveOkResult<T>
  }

  /**
   * 단건 속성 일부 수정
   * data에 정의되지 않은 속성은 변경되지 않음
   * @param url
   * @param data 일부 속성만 포함한 객체
   * @returns
   */
  async patch<T>(url: string, data: T): Promise<TPatchResult<T>> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.patch(url, data)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    const result = response.data as TApiOkResponse<T>
    return { kind: "ok", data: result } as TSaveOkResult<T>
  }

  /**
   * 단건 삭제
   * @param url
   * @returns
   */
  async delete<T>(url: string): Promise<TDeleteResult> {
    const response: ApiResponse<TApiResponse<T>> = await this.api.apisauce.delete(url)

    const problem = getGeneralApiProblem(response)
    if (problem) return problem

    return { kind: "ok" } as TDeleteOkResult
  }
}
