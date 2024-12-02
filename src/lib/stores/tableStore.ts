import {get, writable} from 'svelte/store';
import {deleteApi, getApi, postApi, putApi} from "$lib/api";
import type {ModalDataType, RowData, SelectItems} from "$lib/data/tasks";

// 각 컬럼 표시 여부
export const showDescription = writable(true)
export const showCategory = writable(true)
export const showType = writable(true)
export const showEndpoint = writable(true)
export const showLabel = writable(true)
export const showTag = writable(true)
export const showCreatedAt = writable(true)
export const showUpdatedAt = writable(true)

// 정렬 아이콘 상태
export const orderIcon = writable<{Label: string, Tag: string, Created_at: string, Updated_at: string}>({
  Label: "↕",
  Tag: "↕",
  Created_at: "↕",
  Updated_at: "↕",
});

// 모달 데이터
export const modalData = writable<ModalDataType>({
  label: "",
  type: "",
  endpoint: "",
  category: "",
  tag: "",
  active: false,
  vendor: "",
  description: "",
});

// 현재 페이지
export const currentPage = writable(1);
// 페이지 당 아이템 수
export const itemsPerPage = 10;

// 현재 카테고리 페이지
export const cateCurrentPage = writable(1);
// 카테고리 셀렉트 상태
export const isSelectOpen = writable(false);
// 선택된 Thead 카테고리
export const isTheadCategory = writable('');
// 선택된 모달 카테고리
export const isModalCategory = writable('');
// 선택된 카테고리 TAG
export const categoryTag = writable('');

// 검색 쿼리
export const searchQuery = writable('');

// 데이터 모달 상태
export const isModal = writable(false);
// 모달 모드
export const modalMode = writable('add');
// 모달 카테고리 셀렉트 상태
export const isModalSelectOpen = writable(false);
// 카테고리 모달 상태
export const isCategoryModal = writable(false);

// Label 자동 입력 상태
export const selfLabel = writable(false);
// Tag 자동 입력 상태
export const selfTag = writable(false);

// 체크박스 데이터
const setSelected = () => {
  const {subscribe, set, update} = writable<{tableItems: SelectItems[], tableItem: string | number | null, categoryItems: SelectItems[], categoryItem: string | number | null}>({tableItems: [], tableItem: null, categoryItems: [], categoryItem: null});

  // 선택된 아이템 추가/삭제
  const checked = (id: number, type: string) => {
    update(items => {
      const findId = type === 'table' ? items.tableItems.some(item => item.id === id)
        : type === 'category' ? items.categoryItems.some(item => item.id === id) : false;
      let selectItems;
      if (findId) {
        // id 존재 시 해당 객체 삭제
        selectItems = type === 'table' ? items.tableItems.filter(item => item.id !== id)
        : type === 'category' ? items.categoryItems.filter(item => item.id !== id) : [];
      } else {
        // id 미존재 시 새로운 객체로 추가
        selectItems = type === 'table' ? [...items.tableItems, { id }]
        : type === 'category' ? [...items.categoryItems, { id }] : [];
      }
      // 객체 1개만 존재 시 selectItem 할당
      const selectItem = selectItems.length === 1 ? selectItems[0].id : null;
      return type === 'table' ? { ...items, tableItems: selectItems, tableItem: selectItem } : { ...items, categoryItems: selectItems, categoryItem: selectItem };
    });
  };

  // 현재 페이지 모든 체크박스 선택
  const allChecked = (ids: { id: number | string }[], type: string) => {
    update(items => {
      return type === 'table' ? { ...items, tableItems: [{id: 'all'}, ...ids] }
        : type === 'category' ? { ...items, categoryItems: [{id: 'all'}, ...ids] } : items;
    });
  };

  // 체크박스 초기화
  const resetChecked = (type: string) => {
    // 데이터 초기화
    update(items => {
      return type === 'all' ? { ...items, tableItems: [], tableItem: null, categoryItems: [], categoryItem: null }
        : type === 'table' ? { ...items, tableItems: [], tableItem: null }
          : type === 'category' ? { ...items, categoryItems: [], categoryItem: null } : items;
    });
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

// task 데이터
const setTaskData = () => {
  const {subscribe, set, update} = writable<{data: RowData[], dataItem: RowData[], totalPages: number, items: number, status: number }>({ data: [], dataItem: [], totalPages: 0, items: 0, status: 0 });

  // 메뉴별 전체 데이터 요청
  const getDatas = async (dataType: string) => {
    const page = get(currentPage);

    const options = {
      path: `/dpi/${dataType}?page=${page}&limit=${itemsPerPage}&sort=created_at`,
    };
    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        data: res.data.data,
        totalPages: res.data.data_info.total_pages,
        items: res.data.length,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('전체 데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 메뉴별 개별 데이터 요청
  const getData = async (dataType: string, id: number | string) => {
    const options = {
      path: `/dpi/${dataType}/${id}`,
    };
    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        dataItem: res.data.data,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 데이터 추가
  const postData = async (data: FormData) => {
    const options = {
      path: '/dpi/domains', data,
    }
    try {
      const res = await postApi(options);
      update(item => ({
        ...item,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('이미 존재하는 태그입니다. 확인 후 다시 시도해 주세요.');
    }
  }

  // 데이터 수정
  const updateData = async (id: string | number, data: FormData) => {
    const options = {
      path: `/dpi/domains/${id}`, data,
    }
    try {
      const res = await putApi(options);
      update(item => ({
        ...item,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('이미 존재하는 태그입니다. 확인 후 다시 시도해 주세요.');
    }
  }

  // 데이터 삭제
  const deleteData = async (id: number | string) => {
    const options = {
      path: `/dpi/domains/${id}`,
    }
    try {
      const res = await deleteApi(options);
      update(item => ({
        ...item,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('데이터 삭제에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  // 특정 열 기준 정렬 요청
  const sorted = async (dataType: string, sortBy: string, orderBy: string) => {
    const query = get(searchQuery).trim().toLowerCase();
    const tag = get(categoryTag);

    const options = {
      path: `/dpi/${dataType}?page=1&limit=${itemsPerPage}&search=${query}&sort=${sortBy}&order=${orderBy}&category=${tag}`,
    }

    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        data: res.data.data,
        totalPages: res.data.data_info.total_pages,
        items: res.data.length,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('데이터 정렬에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 검색 및 카테고리 필터링 요청
  const filtered = async (dataType: string) => {
    const query = get(searchQuery).trim().toLowerCase();
    const tag = get(categoryTag);

    const options = {
      path: `/dpi/${dataType}?page=1&limit=${itemsPerPage}&search=${query}&category=${tag}`,
    }

    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        data: res.data.data,
        totalPages: res.data.data_info.total_pages,
        items: res.data.length,
        status: res.status,
      }));
    } catch (err: any) {
      if (err.status === 400) { // 검색 결과 없음
        update(item => ({
          ...item,
          status: 401,
        }));
      } else {
        update(item => ({
          ...item,
          status: err.status,
        }));
        alert('데이터 필터링에 실패하였습니다. 잠시 후 다시 시도해 주세요. ?');
      }
    }
  };

  // 카테고리 정렬 리셋
  const resetCategory = async (dataType: string) => {
    const query = get(searchQuery).trim().toLowerCase();

    const options = {
      path: `/dpi/${dataType}?page=1&limit=${itemsPerPage}&search=${query}`,
    }

    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        data: res.data.data,
        totalPages: res.data.data_info.total_pages,
        items: res.data.length,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('데이터 필터링에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  return {
    subscribe,
    set,
    update,
    getDatas,
    getData,
    postData,
    updateData,
    deleteData,
    sorted,
    filtered,
    resetCategory,
  }
}

export const tasks = setTaskData();

const setCategoryData = () => {
  const {subscribe, set, update} = writable<{ data: RowData[], dataItem: RowData[], totalPages: number, items: number, status: number }>({data: [], dataItem: [], totalPages: 0, items: 0, status: 0});

  // 카테고리 전체 데이터 요청
  const getCategories = async (dataType: string) => {
    const page = get(cateCurrentPage);

    const options = {
      path: `/dpi/${dataType}-categories?page=${page}`,
    };
    try {
      const res = await getApi(options);
      set(res.data);
      update(item => ({
        ...item,
        data: res.data.data,
        totalPages: res.data.data_info.total_pages,
        items: res.data.length,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('전체 카테고리를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 카테고리 개별 데이터 요청
  const getCategory = async (id: number | string) => {
    const options = {
      path: `/dpi/domain-categories/${id}`,
    };
    try {
      const res = await getApi(options);
      update(item => ({
        ...item,
        dataItem: res.data.data,
        status: res.status,
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('카테고리를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 카테고리 추가
  const postCategory = async (data: FormData) => {
    const options = {
      path: `/dpi/domain-categories`, data
    };
    try {
      const res = await postApi(options);
      update(item => ({
        ...item,
        data: [...item.data, res.data.data],
        length: res.data.length,
        status: res.status
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('카테고리 추가에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 카테고리 수정
  const updateCategory = async (id: number | string, data: FormData) => {
    const options = {
      path: `/dpi/domain-categories/${id}`, data
    };
    try {
      const res = await putApi(options);
      update(item => ({
        ...item,
        data: [...item.data, res.data.data],
        length: res.data.length,
        status: res.status
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('카테고리 수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 카테고리 삭제
  const deleteCategory = async (id: number | string) => {
    const options = {
      path: `/dpi/domain-categories/${id}`,
    };
    try {
      const res = await deleteApi(options);
      update(item => ({
        ...item,
        status: res.status
      }));
    } catch (err: any) {
      update(item => ({
        ...item,
        status: err.status,
      }));
      alert('카테고리 삭제에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return {
    subscribe,
    set,
    update,
    getCategories,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory,
  }
}

export const categories = setCategoryData();