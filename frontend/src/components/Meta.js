import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Helmet>
    </div>
  )
}

Meta.defaultProps = {
  title: 'GretaBrat shop',
  description: 'Buy 3D art',
  keywords: '3D art, 3D prints, GretaBrat',
}

export default Meta
