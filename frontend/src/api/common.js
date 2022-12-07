import $ from 'jquery'
import config from '../config'


//default handler - returns errors field from server response or throw error with given text
const defaultApiErrorHandler = (jqXHR, transKey = 'unknown', message = 'Unknown error') => {
  if (jqXHR.status === 402) {
    return []
  }

  if (jqXHR.responseJSON && jqXHR.responseJSON.errors && jqXHR.responseJSON.errors.length) {
    return jqXHR.responseJSON.errors
  } else {
    return [{type: 'error', transKey: transKey, message: message}]
  }
}

export const createApi = (httpMethod, url,
  {
    urlData = false,
    inputData = (payload) => JSON.stringify(payload),
    resolveData = (response) => response,
    rejectData = (defHandler, jqXHR) => { return defHandler(jqXHR) }
  } = {}
) => {
  return (token, payload, ...args) => {
    let requestUrl = url
    if (typeof urlData === 'function') {
      const urlParams = urlData(payload, ...args)
      console.log('%c urlParams=' + JSON.stringify(urlParams), 'color: green')
      requestUrl = url.replace(/\{(.*?)\}/g, function (match, field) {
        return urlParams[field]
      })
    }

    return new Promise((resolve, reject) => {
      let ajaxOptions = {
        type: httpMethod,
        url: config.apiUrl + requestUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: inputData(payload),
        success: function (data) {
          resolve(resolveData(data))
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(`%c [API Error] HTTP ${jqXHR.status}, ${errorThrown}`, 'background: red; color: yellow')
          reject(rejectData(defaultApiErrorHandler, jqXHR, textStatus, errorThrown))
        }
      }

      if (token) {
        ajaxOptions.headers = {
          Authorization: 'Bearer ' + token
        }
      }

      // Used for backend debugging :)
      if (__DEV__) {
        ajaxOptions['xhrFields'] = {
          withCredentials: true
        }
      }

      $.ajax(ajaxOptions)
    })
  }
}

export const mockApi = (fakeData, timeout = 2000) => () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeData)
    }, timeout)
  })
}

