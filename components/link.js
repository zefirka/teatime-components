import { h, React } from '../h';

const { a, createTag } = h;
const linkHelper = createTag(Link);

Link.defaultProps = {
  href: '',
  styles: {},
};

Link.propTypes = {
  styles: React.PropTypes.object,
};

export { Link as default, linkHelper as link };

function Link({ styles, href, ...o }) {
  return a({...o, className: styles.control, href});
}