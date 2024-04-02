import noResultsImage from '../../assets/images/no-results.png';
import './no-results.scss';

const NoResults = () => {
  return (
    <div className="no-results">
      <img src={noResultsImage} alt="No results found." className="no-results--image" />
    </div>
  );
};

export default NoResults;
