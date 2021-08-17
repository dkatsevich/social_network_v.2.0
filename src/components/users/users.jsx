import {connect} from "react-redux";
import {followUser, getUsersThunk, unFollowUser} from "../../redux/reducers/usersReducer";
import {useEffect, useState} from "react";
import Spinner from "../spinner/spinner";
import User from "./user";
import './users.scss'
import Paginator from "./paginator";

const Users = ({getUsersThunk, users, loading, pageNumber, pageSize, totalUserCount, followUser, unFollowUser, disableUsers}) => {
    useEffect(() => {
        getUsersThunk(pageNumber, pageSize)
    }, [])


    return (
        <div className='users'>
            <div className="users__title">Users</div>
            <Paginator
                getUsersThunk={getUsersThunk}
                totalUserCount={totalUserCount}
                pageSize={pageSize}
                pageNumber={pageNumber}
            />
            {loading ? <Spinner/> : <div className="users__wrapper">
                {users.map(item => {
                    if (disableUsers.some(user => user.id === item.id)) {
                        return <User {...item} followUser={followUser} unFollowUser={unFollowUser} disable={true}/>
                    }
                    return <User {...item} followUser={followUser} unFollowUser={unFollowUser} disable={false}/>
                })}
            </div>}
        </div>
    )
}



const mapStateToProps = ({usersReducer: {users, loading, pageNumber, pageSize, totalUserCount, disableUsers}}) => ({users, loading, pageNumber, pageSize, totalUserCount, disableUsers})

export default connect(mapStateToProps, {getUsersThunk, followUser, unFollowUser})(Users);