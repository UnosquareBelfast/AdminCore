require('dotenv').config();
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });


// jest.mock('sweetalert2', jest.fn() );
// jest.mock('jwt-decode', () => {  return {sub: 1}; });


// (() => { console.log("called"); })();