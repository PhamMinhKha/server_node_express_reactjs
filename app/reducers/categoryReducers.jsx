import axios from 'axios';

const Categories = (state = null, action) => {
    switch(action.type){
        case 'DANH_SACH_LOAI':
            return action.categories;
        default:
            return state;
    }
}

export default Categories;