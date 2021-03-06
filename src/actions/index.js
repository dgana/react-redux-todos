export const fetchMemosSuccess = memos => {
  return {
    type: 'FETCH_MEMOS_SUCCESS',
    payload: memos
  }
}

export const addMemosSuccess = memos => {
  return {
    type: 'ADD_MEMOS_SUCCESS',
    payload: memos
  }
}

export const deleteMemosSuccess = (id) => {
  return {
    type: 'DELETE_MEMOS_SUCCESS',
    payload: id
  }
}

export const updateMemosSuccess = (id, memo) => {
  return {
    type: 'UPDATE_MEMOS_SUCCESS',
    payload: {
      id: id,
      memo: memo
    }
  }
}

export const updateCompleteSuccess = (complete) => {
  console.log(complete);
  return {
    type: 'UPDATE_COMPLETE_SUCCESS',
    payload: complete
  }
}

export const updateComplete = (id, memo, completed) => {

  let isTrueSet = (completed === "true")
  let getStatus = (isTrueSet) ? "false" : "true"

  return (dispatch) => {
    fetch('http://localhost:3004/memos/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        memo: memo,
        completed: getStatus
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((complete) => dispatch(updateCompleteSuccess(complete)))
  }
}

export const updateMemo = (id, memo) => {
  console.log('ACTION: ' + memo)
  return (dispatch) => {
    fetch('http://localhost:3004/memos/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        memo: memo,
        completed: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(memos => dispatch(updateMemosSuccess(id, memo)))
  }
}

export const addMemos = (memo) => {
  return (dispatch) => {
    fetch('http://localhost:3004/memos/', {
      method: 'POST',
      body: JSON.stringify({
        memo: memo,
        completed: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(memos => dispatch(addMemosSuccess(memos)))
  }
}

export const deleteMemo = (id) => {
  console.log(id)
  return (dispatch) => {
    fetch('http://localhost:3004/memos/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(memos => dispatch(deleteMemosSuccess(id)))
  }
}

export const fetchMemos = () => {
  return (dispatch) => {
    fetch('http://localhost:3004/memos/')
      .then(res => res.json())
      .then(memos => dispatch(fetchMemosSuccess(memos)))
  }
}
