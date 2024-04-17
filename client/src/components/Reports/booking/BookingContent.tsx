

function BookingContent() {

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Specialty</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {specialties.length > 0 &&
              specialties?.map((item, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className=" text-white text-nowrap"> {item.specialty_name}</td>
                  <td>
                    <FiEdit size={17} color="#374151" cursor="pointer" onClick={() => onEdit(item.id)} />
                  </td>
                  <td>
                    <RiDeleteBin6Line
                      size={17}
                      color="red"
                      cursor="pointer"
                      onClick={() => onDelete(item.id)}
                    />
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookingContent;
