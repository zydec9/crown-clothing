import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCategoriesIsLoading } from '../../store/categories/categories.selector'
import { Fragment } from 'react'

import ProductCard from '../product-card/product-card.component'
import Spinner from '../spinner/spinner.component'

import { CategoryPreviewContainer } from './category-preview.styles'



const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (


        <Fragment>

{isLoading && <Spinner /> || <CategoryPreviewContainer>
                <h2>
                    <Link to={title} ><span className='title'>{title.toUpperCase()}</span></Link>
                </h2>
                <div className='preview'>
                    {
                        products.slice(0, 4).map(product => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </div>
            </CategoryPreviewContainer>}

        </Fragment>
    )
}

export default CategoryPreview