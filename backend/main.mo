import Func "mo:base/Func";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Time "mo:base/Time";

// backend/main.mo
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {
  // Define a Post type
  type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Stable variable to store posts
  stable var posts: [Post] = [];

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async () {
    let newPost = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append([newPost], posts);
  };

  // Function to get all posts, most recent first
  public query func getPosts() : async [Post] {
    return posts;
  };
}
