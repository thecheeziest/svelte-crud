import {get, writable} from 'svelte/store';
import type { RowData, SelectedItem } from "$lib/data/tasks";
import {deleteApi, getApi, postApi} from "$lib/api";

// 각 컬럼 표시 여부
export const showDescription = writable(true)
export const showCategory = writable(true)
export const showName = writable(true)
export const showLink = writable(true)
export const showHashtag = writable(true)

// 각 컬럼 정렬 상태
export const sortStates: { [key: string]: { ascending: boolean } } = {
  name: { ascending: true },
  category: { ascending: true },
  description: { ascending: true },
  hashtag: { ascending: true }
};

// 전체 페이지 수
export const totalPages = writable(1);
// 현재 페이지
export const currentPage = writable(1);
// 페이지 당 아이템 수
export const itemsPerPage = 10;

// 검색 쿼리
export const searchQuery = writable('');

// 모달 상태
export const isModal = writable(false);

// 체크박스 데이터
const setSelected = () => {
  const {subscribe, set, update} = writable<SelectedItem[]>([]);

  // 선택된 아이템 추가/삭제
  const checked = (id: number) => {
    update(items => {
      // 중복 id 체크
      const exists = items.some(item => item.id === id);
      if (exists) {
        // id 존재 시 해당 객체 삭제
        return items.filter(item => item.id !== id);
      } else {
        // id 미존재 시 새로운 객체로 추가
        return [...items, { id }];
      }
    });
  };

  // 현재 페이지 모든 체크박스 선택
  const allChecked = (pageItem: number[]) => {
    // 현재 페이지의 모든 ID 체크
    set(pageItem.map(id => ({ id })));
  };

  // 체크박스 초기화
  const resetChecked = () => {
    // 데이터 초기화
    set([]);
  };

  return {
    subscribe,
    set,
    update,
    checked,
    allChecked,
    resetChecked,
  }
}

export const selected = setSelected();

// 숫자 문자열을 숫자처럼 정렬
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

// task 데이터
const setTaskData = () => {
  const {subscribe, set, update} = writable<{task: RowData[], paginated: RowData[] }>({ task: [], paginated: [] });

  const getData = async (dataType: string) => {
    const options = {
      path: `/${dataType}`,
    };
    try {
      const res = await getApi(options);
      console.log('get', res)
      update(item => ({
        ...item,
        task: [...res.data],
        paginated: res.data.slice(0, itemsPerPage)
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async (data: object) => {
    const options = {
      path: '/domain',
      data: data,
    }
    try {
      const res = await postApi(options);
      console.log('post', res.data);
      update(item => ({
        ...item,
        task: [...item.task, res.data],
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const deleteData = async (ids: object) => {
    const options = {
      path: '/domain',
      data: ids,
    }
    try {
      const res = await deleteApi(options);
      set(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // task 데이터 정렬
  const sorted = (type: string) => {
    if (sortStates[type]) {
      update((item) => {
        return {
          ...item,
          task: item.task.sort((a: RowData, b: RowData) => {
            const aValue = a[type];
            const bValue = b[type];

            // 문자열 비교
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return sortStates[type].ascending
                ? collator.compare(aValue, bValue)
                : collator.compare(bValue, aValue);
              // 숫자 비교
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortStates[type].ascending ? aValue - bValue : bValue - aValue;
            }
            return 0; // 타입 다를 시 비교하지 않음
          }),
        };
      });
    }
  };

  // 현재 페이지의 task 데이터만 반환
  const paginated = () => {
    update(item => {
      const page = get(currentPage);
      return {
        ...item,
        paginated: item.task.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      };
    });
  };

  // 검색어로 task 데이터 필터링
  const search = () => {
    update(item => {
      const query = get(searchQuery).trim().toLowerCase();

      // 검색어 존재 시 filtered 데이터 반환
      if (query) {
        const filteredTasks = item.task.filter(task =>
          Object.values(task).some(value =>
            String(value).toLowerCase().includes(query)
          )
        );
        return {
          ...item,
          task: [...item.task],
          paginated: filteredTasks.slice(0, itemsPerPage),
          filtered: filteredTasks,
        };
      } else {
      // 검색어 미존재 시 filtered 데이터 초기화
        return {
          ...item,
          task: [...item.task],
          paginated: item.task.slice(0, itemsPerPage),
          filtered: [],
        };
      }
    });
  };

  return {
    subscribe,
    set,
    update,
    getData,
    postData,
    deleteData,
    sorted,
    paginated,
    search,
  }
}

export const tasks = setTaskData();