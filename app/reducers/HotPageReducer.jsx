const HotPage = (state = null, action) => {
    switch(action.type){
        case 'CAP_NHAT_POSTS_HOT_PAGE':
            return action.posts;
        default:
            return state;
    }
}

export default HotPage;