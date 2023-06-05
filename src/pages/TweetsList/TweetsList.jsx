import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import * as api from '../../shared/users-api';
import { save, load } from '../../shared/storage';
import ReactLoading from 'react-loading';

import Filter from '../../components/Filter/Filter';
import Tweet from '../../components/Tweet/Tweet';

import styles from './tweetList.module.css';

const TweetsList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef(null);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [filter, setFilter] = useState(
    searchParams.get('filter') || 'show-all'
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const data = await api.getAllUsers();
        setUsers(data);
        setFilteredUsers(data);

        const totalPages = Math.ceil(data.length / 3);
        if (page < totalPages) {
          setShowLoadMore(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    searchParams.set('filter', filter);
    const savedIds = load('followings');
    if (filter === 'show-all') {
      setFilteredUsers(users);
    }
    if (filter === 'followings') {
      setFilteredUsers(users.filter(({ id }) => savedIds.includes(id)));
    }
    if (filter === 'follow') {
      setFilteredUsers(users.filter(({ id }) => !savedIds.includes(id)));
    }
  }, [filter, searchParams, users]);

  useEffect(() => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    const totalPages = Math.ceil(filteredUsers.length / 3);
    scrollToBottom();

    if (page < totalPages) {
      setShowLoadMore(true);
    } else {
      setShowLoadMore(false);
    }
  }, [filteredUsers.length, page, searchParams, setSearchParams]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  const updateUserFollowers = async (id, data) => {
    try {
      const updatedUser = await api.updateUserFollowers(id, data);
      return updatedUser.followers;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleFollowClick = async (tweetId) => {
    try {
      const updatedTweets = users.map((tweet) => {
        if (tweet.id === tweetId) {
          const savedIds = load('followings');

          if (!savedIds.includes(tweetId)) {
            save('followings', [...savedIds, tweetId]);
          }
          return { ...tweet, followers: tweet.followers + 1, following: true };
        }
        return tweet;
      });
      setUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId)
          .followers,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollowClick = async (tweetId) => {
    try {
      const updatedTweets = users.map((tweet) => {
        if (tweet.id === tweetId) {
          const savedIds = load('followings');

          if (savedIds.includes(tweetId)) {
            save(
              'followings',
              savedIds.filter((id) => id !== tweetId)
            );
          }
          return { ...tweet, followers: tweet.followers - 1, following: false };
        }
        return tweet;
      });
      setUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId)
          .followers,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreUsers = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleFilterChange = useCallback((selectedOption) => {
    setPage(1);
    setFilter(selectedOption);
  }, []);

  return (
    <div className={styles.container} ref={scrollRef}>
      <div className={styles.filterWrapper}>
        <Link className={styles.buttonLink} to="/">
          Back
        </Link>
        <Filter onFilterChange={handleFilterChange} initialValue={filter} />
      </div>

      {loading && (
        <ReactLoading type="spin" color="#b311ff" height={50} width={50} />
      )}
      <ul className={styles.tweetList}>
        {filteredUsers.length && !loading ? (
          filteredUsers
            .slice(0, page * 3)
            .map((tweet) => (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                handleUnfollowClick={handleUnfollowClick}
                handleFollowClick={handleFollowClick}
              />
            ))
        ) : (
          <p>NO USERS</p>
        )}
      </ul>
      {showLoadMore && (
        <button
          className={`${styles.button} ${styles.loadMore}`}
          onClick={loadMoreUsers}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default TweetsList;
