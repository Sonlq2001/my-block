export const LIST_SELECT = [
  {
    id: '-createdAt',
    name: 'Mới nhất',
  },
  {
    id: 'createdAt',
    name: 'Lâu nhất',
  },
];

export const DATA_ARTICLES = [
  {
    id: 1,
    name: 'Hôm nay là ngày thứ 7, sắp tết rồi ha',
    img: 'https://cdn.pixabay.com/photo/2022/01/26/10/00/child-6968392_960_720.jpg',
  },
  {
    id: 2,
    name: 'Gió rít, rét quá',
    img: 'https://cdn.pixabay.com/photo/2021/09/13/08/18/blue-flower-6620619_960_720.jpg',
  },
  {
    id: 3,
    name: 'Hình như cô thơm đang ở dưới nhà và đang nói chuyện với mẹ',
    img: 'https://cdn.pixabay.com/photo/2016/11/18/14/00/plants-1834749_960_720.jpg',
  },
  {
    id: 4,
    name: 'Cô thơm nói to quá',
    img: 'https://cdn.pixabay.com/photo/2021/08/08/14/16/road-6531031_960_720.jpg',
  },
  {
    id: 5,
    name: 'Bụng đang đói mà lại béo quá, nên không ăn linh tinh nữa',
    img: 'https://cdn.pixabay.com/photo/2022/01/17/11/22/sea-6944490__340.jpg',
  },
  {
    id: 6,
    name: 'Tối nay phải tập thể dục để giảm cân nào',
    img: 'https://cdn.pixabay.com/photo/2022/01/12/19/28/mountains-6933693__340.jpg',
  },
];

export enum TAB_PROFILE {
  PUBLIC = 'public',
  SAVE = 'save',
  DRAFT = 'draft',
  ALONE = 'alone',
}

export enum TAB_PROFILE_EDIT {
  PROFILE = 'profile',
  SOCIALS = 'socials',
}

export const MAX_NAME = 25;
export const MAX_DESCRIPTION = 600;
