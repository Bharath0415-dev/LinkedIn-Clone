import React from 'react'
import "./index.scss";
import inlogo from "../../../assets/inlogo.png"
import { FaHome,FaUserFriends ,FaBriefcase,FaSearch} from "react-icons/fa";
import { IoChatboxEllipsesOutline ,IoNotifications} from "react-icons/io5";
import ProfilePopup from "../ProfilePopup";
import SearchUsers from "../SearchUsers";
import { getAllUsers } from "../../../api/FirestoreAPI";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from "react";
function Topbar({currentUser}) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
    let navigate = useNavigate();
    const gotoRoute= (route) => {
        navigate(route);
    };
    const displayPopup = () => {
      setPopupVisible(!popupVisible);
    };
    const openUser = (user) => {
      navigate("/profile", {
        state: {
          id: user.id,
          email: user.email,
        },
      });
    };
    const handleSearch = () => {
      if (searchInput !== "") {
        let searched = users.filter((user) => {
          return Object.values(user)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
  
        setFilteredUsers(searched);
      } else {
        setFilteredUsers(users);
      }
    };
    useEffect(() => {
      let debounced = setTimeout(() => {
        handleSearch();
      }, 1000);
  
      return () => clearTimeout(debounced);
    }, [searchInput]);
  
    useEffect(() => {
      getAllUsers(setUsers);
    }, []);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
        <img src={inlogo} className='inlogo' alt='inlogo'/>
        {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
             <FaSearch 
             size={20} 
             className='react-icon'
             onClick={() => setIsSearch(true)}
             />
             <FaHome 
             size={24}
             className='react-icon'
             onClick={()=>gotoRoute("/home")}/> 
             
             <FaUserFriends 
             size={24} 
             className='react-icon'
             onClick={()=>gotoRoute("/connections")}/>
             
             <FaBriefcase size={24} className='react-icon'/>
             
             <IoChatboxEllipsesOutline size={24} className='react-icon'/>
             
             <IoNotifications size={24} className='react-icon'/>
        </div>
      )}

    <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Topbar