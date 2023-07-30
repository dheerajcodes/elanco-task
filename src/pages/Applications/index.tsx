import ResourceGrid from '../../Components/ResourceGrid';

export default function Applications() {
  return <ResourceGrid heading="Applications" apiEndpoint="https://engineering-task.elancoapps.com/api/applications" linkPath="/applications" />;
}
