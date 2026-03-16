let showcasePosts = [];

export class ShowcasePostModel {
    static createPost(post) {
        showcasePosts.push(post);
        return post;
    }

    static getAllPosts() {
        return showcasePosts;
    }

    static deletePost(id) {
        showcasePosts = showcasePosts.filter(p => p.id !== id);
        return true;
    }
}