import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'

export default function User (props) {
  return props.noUser === true
    ? <p className={header}>{'this user does not exist'}</p>
    : <div>
      {props.isFetching === true
        ? <p className={header}>{'Loading'}</p>
        : <div>
          <div className={userContainer}>
            <div> {props.name} </div>
          </div>
          {props.duckIds.map((id) => (
            <DuckContainer duckId={id} key={id} />
          ))}
          {props.duckIds === 0
            ? <p className={header}>{`looks like ${props.name.split(' ')[0]} hasn't made any ducks yet`}</p>
            : null}
        </div>}
      {props.error === true ? <p className={errorMsg}>{error}</p> : null}
    </div>
}

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
}
