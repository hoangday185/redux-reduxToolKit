//type predicate  : dùng để thu hẹp kiểu của 1 biến
//đầu tiên khai báo 1 function check kiểm tra cấu trúc về mặc logic javascript
//tiếp theo chúng ta thêm parameterName is Type làm kiểu return của function thay vì boolean
//khi dùng func kiểm tra kiểu này, ngoài việc kiểm tra về mặt logic cấu trúc, nó còn
//chuyển kiểu được
//so sánh với phương pháp ép kiểu "type assertions" thì ép kiểu chúng giúp chúng ta
//đúng về mặt type chưa chắc về logic

import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * kiểu ErrorFormObject dành cho trường họp bao quát
 */

type ErrorFormObject = {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

type EntityError = {
  status: 422
  data: {
    error: ErrorFormObject
  }
}

//thu hẹp một error có kiểu không xác định về `FetchBaseQueryError`

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

//thu hep error có kiểu ko xác định về một object với thuộc tính message string
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

//thu hẹp error có kiểu ko xác định trả về lỗi liên qua đến vấn đề post put ko đúng field

export function isEnityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}
