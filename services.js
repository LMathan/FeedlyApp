import { supabase } from './supabase';

export async function fetchGlobalFeed() {
  const { data } = await supabase
    .from('posts')
    .select('*, users(username)')
    .order('created_at', { ascending: false });

  return data.map(post => ({
    ...post,
    username: post.users?.username || 'Unknown'
  }));
}

export async function fetchPersonalizedFeed(userId) {
  const { data } = await supabase.rpc('get_followed_posts', { uid: userId });
  return data;
}

export async function isFollowing(follower_id, following_id) {
  const { data } = await supabase
    .from('user_follows')
    .select('*')
    .eq('follower_id', follower_id)
    .eq('following_id', following_id);
  return data.length > 0;
}

export async function toggleFollow(follower_id, following_id, follow) {
  if (follow) {
    await supabase.from('user_follows').insert({ follower_id, following_id });
  } else {
    await supabase
      .from('user_follows')
      .delete()
      .eq('follower_id', follower_id)
      .eq('following_id', following_id);
  }
}
