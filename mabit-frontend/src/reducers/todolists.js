// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣어준다.

const SAVE = 'TODOLISTS/SAVE';
const DELETE = 'TODOLISTS/DELETE';
const INIT = 'TODOLISTS/INIT';
const UPDATE = 'TODOLISTS/UPDATE';

export const saveTodoLists = (newTodo) => ({ type: SAVE, newTodo });
export const initTodoLists = (initialState) => ({ type: INIT, initialState });
export const deleteTodoLists = (id) => ({ type: DELETE, id });
export const updateTodoLists = (newTodo) => ({
  type: UPDATE,
  newTodo,
});
const initialState = {
  todolists: [],
};

const todolists = (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      return { todolists: [...state.todolists, action.newTodo] };
    case INIT:
      return { todolists: action.initialState };
    case DELETE:
      return {
        todolists: state.todolists.filter(
          (todolist) => todolist.id !== action.id,
        ),
      };
    case UPDATE:
      return {};
    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나온다
    default:
      return state;
  }
};

export default todolists;
