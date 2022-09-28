import { TGeneralApiProblem } from "./api-problem"

/**
 * 목록 조회 결과
 */
export type TListOkResult<T> = {
  kind: "ok"
  data: T[]
  info?: {
    count: number // 전체 개수
    amount: number // 페이지당 개수
    page: number // 현재 페이지
    pages: number // 전체 페이지 수
    next?: string | null // 다음 페이지 URL
    prev?: string | null // 이전 페이지 URL
  }
}
export type TListResult<T> = TListOkResult<T> | TGeneralApiProblem

/**
 * 상세 조회 결과
 */
export type TGetOkResult<T> = { kind: "ok"; data: T }
export type TGetResult<T> = TGetOkResult<T> | TGeneralApiProblem

/**
 * 생성 결과
 */
export type TSaveOkResult<T> = { kind: "ok"; data: T }
export type TSaveResult<T> = TSaveOkResult<T> | TGeneralApiProblem
export type TPostResult<T> = TSaveResult<T>

/**
 * 수정 결과
 */
export type TPutResult<T> = TSaveResult<T>
export type TPatchResult<T> = TSaveResult<T>

/**
 * 삭제 결과
 */
export type TDeleteOkResult<T> = { kind: "ok" }
export type TDeleteResult<T> = TDeleteOkResult<T> | TGeneralApiProblem
