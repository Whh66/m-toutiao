export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}