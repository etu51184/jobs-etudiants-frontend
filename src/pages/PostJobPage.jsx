import AddJobForm from '../components/AddJobForm/AddJobForm';
import '../App.css';

function PostJobPage() {
  const email = localStorage.getItem('email');

  return (
    <div className="container">
      <h2>Post a New Job</h2>
      {email ? (
        <AddJobForm onAdd={() => alert('Job posted successfully!')} />
      ) : (
        <p>You must be logged in to post a job.</p>
      )}
    </div>
  );
}

export default PostJobPage;
