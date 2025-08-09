import { render, screen } from '@testing-library/react'; import CourseCard from '../CourseCard';
test('renders course title', ()=>{ render(<CourseCard title='Math 101' description='Basics'/>); expect(screen.getByText('Math 101')).toBeInTheDocument(); });
