import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ItemCard from '../ItemCard';
import { FiBox } from 'react-icons/fi';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import SelectCalendrier from '@/components/Helper/Calendrier';
import PaginationMenu from '../../Helper/PaginationMenu';
import { useGlobalContext } from '@/components/Helper/GlobalContext';
import AddOrder from '@/components/Add/AddOrder';
import { Order } from '@/Constants/Types';
import { useRouter } from 'next/router';

if (typeof window !== 'undefined') {
  Modal.setAppElement(document.body);
}

const ListePatients = () => {
  {
    /* Orders recover */
  }
  const { Orders, fetchOrders } = useGlobalContext();
  useEffect(() => {
    fetchOrders();
  }, []);

  {
    /* Modal system */
  }
  const [isAddOrderModalVisible, setIsAddOrderModalVisible] = useState(false);
  const openAddOrderModal = () => setIsAddOrderModalVisible(true);
  const closeAddOrderModal = () => {
    setIsAddOrderModalVisible(false);
  };

  const router = useRouter();
  const handleAddOrder = (newOrder: Order) => {
    router.push(`/View?type=order&num=${newOrder.id}`);
  };

  {
    /* Search bar */
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  useEffect(() => {
    setDisplayedOrders(Orders);
  }, [Orders]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery) {
      setDisplayedOrders(Orders);
      return;
    }
    const searchTerms = searchQuery.toLowerCase().split(' ');
    const searchResults = Orders.filter((order) =>
      searchTerms.some((term) =>
        `${order.patient?.firstName} ${order.patient?.lastName} ${order.orderDate} ${order.orderState}`
          .toLowerCase()
          .includes(term),
      ),
    );
    setDisplayedOrders(searchResults);
  };
  {
    /* Pagination system */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = displayedOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(displayedOrders.length / ordersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  const navigateToPage = (pageNumber: number): void =>
    setCurrentPage(pageNumber);

  return (
    <div className="ml-[10vh] md:ml-[15vh]">
      <Modal
        isOpen={isAddOrderModalVisible}
        onRequestClose={closeAddOrderModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-auto z-50 focus:outline-none"
      >
        <AddOrder onClose={closeAddOrderModal} onOrderAdded={handleAddOrder} />
      </Modal>
      <div className="w-4/5 mx-auto p-6 bg-light-white ">
        <div className="border-b-2 border-light-gray pb-4 flex items-center justify-center">
          <FiBox size={30} className="mr-2" />
          <h1 className="text-center font-bold text-3xl p-2 md:text-4x1 text-secondary-dark-blue ">
            Liste des commandes
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center w-full mt-4">
          <div className="flex flex-col md:flex-row justify-center items-center w-full p-2 border-2 border-light-gray rounded-lg">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-light-gray rounded-lg p-2 w-full"
            />
          </div>
          <button
            className="h-12 mt-4 mb-4  md:ml-5 bg-primary-light-blue hover:bg-secondary-medium-blue text-white font-bold py-2 px-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-lg"
            onClick={openAddOrderModal}
          >
            Ajouter
          </button>
        </div>
        <div className="hidden md:grid md:grid-cols-[160px_150px_140px_130px_150px] w-full items-center gap-4 pl-28 mt-4 p-2 border-2 bg-light-gray border-medium-gray rounded-lg mb-5">
          <div className="flex items-center border-l-2 pl-3 border-r-2 border-medium-gray">
            <span className="font-bold text-lg">Numéro</span>
          </div>
          <div className="flex items-center border-r-2 border-medium-gray">
            <span className="font-bold text-lg">Nom</span>
          </div>
          <div className="flex items-center border-r-2 border-medium-gray">
            <span className="font-bold text-lg">Prénom</span>
          </div>
          <div className="flex items-center border-r-2 border-medium-gray">
            <span className="font-bold text-lg">Date</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-lg">Status</span>
          </div>
        </div>
        {currentOrders.map((order) => (
          <ItemCard key={order.id} data={order} />
        ))}
        <PaginationMenu
          currentPage={currentPage}
          totalPages={totalPages}
          navigateToPage={navigateToPage}
        />
        {/*<SelectCalendrier />*/}
      </div>
    </div>
  );
};

export default ListePatients;
