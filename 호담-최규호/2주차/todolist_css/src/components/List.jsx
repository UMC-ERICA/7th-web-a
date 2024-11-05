const List = (props) => {
    const { tech } = props;
    return (
      <li style={{listStyle: 'none'}}>
        { tech }
      </li>
    )
}
  
export default List
  