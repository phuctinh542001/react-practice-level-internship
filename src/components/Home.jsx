const Home = () => {
  return (
    <div className="home">
      <h1>TỔNG QUAN DỰ ÁN</h1>
      <ul>
        <li>Là một trang web quản lý người dùng ở mức độ Thực tập sinh.</li>
        <li>
          API được lấy từ trang: <b>https://reqres.in/</b>
        </li>
      </ul>
      <h1>NỘI DUNG CÔNG VIỆC</h1>
      <p>1. Xây dựng website đảm bảo các chức năng</p>
      <ul>
        <li>Đăng nhập, Đăng xuất</li>
        <li>Các thao tác đối với dữ liệu User (CRUD)</li>
        <li>Tìm kiếm, sắp xếp</li>
        <li>Import, export</li>
      </ul>
      <p>2. Tự do tùy chỉnh giao diện</p>
      <p>3. Public source lên github</p>
      <p>4. Triển khai website lên heroku</p>
    </div>
  );
};

export default Home;
