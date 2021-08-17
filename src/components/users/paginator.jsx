import {useState} from "react";

const Paginator = ({getUsersThunk, totalUserCount, pageSize, pageNumber, portionSize = 10}) => {
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [portionCount, setPortionCount] = useState(pageNumber)

    const totalPageCount = Math.floor(totalUserCount / pageSize);
    const pages = [];
    for (let i = 1; i < totalPageCount; i++) {
        pages.push(i)
    }

    let leftBorder = portionSize * (portionCount - 1) + 1;
    let rightBorder = portionSize * portionCount;

    const requestUsers = (page, pageSize = 5) => {
        if (page !== currentPage) {
            getUsersThunk(page, pageSize)
            setCurrentPage(page)
        }
    }

    return (
        <div>
            {portionCount > 1 && <button onClick={() => setPortionCount(portionCount - 1)} className="users__btn-prev">Prev</button>}
            {pages
                .filter(item => item >= leftBorder && item <= rightBorder)
                .map(item => {
                    const active = item === currentPage ? 'active' : ''
                    return <button onClick={() => requestUsers(item, pageSize)} className={`users__pag-btn ${active}`}>{item}</button>
                })}
            {portionCount < Math.floor(totalPageCount / portionSize) && <button onClick={() => setPortionCount(portionCount + 1)} className="users__btn-next">Next</button>}
        </div>
    )
}

export default Paginator