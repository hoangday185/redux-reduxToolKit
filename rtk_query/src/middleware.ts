import {
  Middleware,
  MiddlewareAPI,
  isRejected,
  isRejectedWithValue
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

function isPayloadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    //isRejectedWithValue là 1 function giúp chúng ta kiểm tra những action có rejectedWithValue = true từ createAsyncThunk
    //RTK query sử dụng createAsyncThunk bên trong nên chúng ta có thể dùng isRejectedWithValue để kiểm tra lỗi
    //action ko bị rejectedWithValue => check kiểu khác

    if (isRejected(action)) {
      if (action.error.name === 'CustomError') {
        //đây là những lỗi liên quan đến quá trình thực thi
        toast.warn(action.error.message)
      }
    }

    if (isRejectedWithValue(action)) {
      //mỗi khi thực hiện query hoặc mutation mà bị lỗi thì nó sẽ chạy vào đây
      //nhưng lỗi từ server, lỗi thực thi thì action nó mới có rejectedWithValue = true
      //còn những action liên quan đến việc caching mà bị rejectWithValue = false, nên khỏi lo nó lọt vào đâu
      if (isPayloadErrorMessage(action.payload)) {
        //lỗi reject từ server chỉ có message thôi
        toast.warn(action.payload.data.error)
      }
    }
    return next(action)
  }
