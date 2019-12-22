import React from "react";

const Categories = ({user}) => {
    return (
        <div>
            {user.name}
            {user.topScore}
        </div>
    )
}

export default Categories;