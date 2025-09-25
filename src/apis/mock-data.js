/**
 * Mock Data cho trang bán thực phẩm chức năng Gym
 * Author: Bạn 😎
 */
export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Supplement Store',
    description: 'Các loại thực phẩm chức năng cho Gymer',
    type: 'public',
    ownerIds: [],
    memberIds: [],
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03'],
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'Whey Protein',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Whey Protein Gold Standard',
            description: 'Whey isolate chất lượng cao, phục hồi cơ bắp nhanh.',
            cover: 'https://i.ibb.co/ZLkhk9J/whey-gold.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-02',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'ISO 100 Dymatize',
            description: 'Whey isolate thủy phân hấp thụ nhanh, ít lactose.',
            cover: 'https://i.ibb.co/4gPps4j/iso100.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-03',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Rule1 Whey Blend',
            description: 'Kết hợp Whey isolate & concentrate, giá hợp lý.',
            cover: 'https://i.ibb.co/0cPQTD9/rule1.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Creatine & BCAA',
        cardOrderIds: ['card-id-04', 'card-id-05', 'card-id-06'],
        cards: [
          {
            _id: 'card-id-04',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Creatine Monohydrate',
            description: 'Hỗ trợ sức mạnh và tăng cơ nhanh chóng.',
            cover: 'https://i.ibb.co/9TtJY7H/creatine.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-05',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'BCAA Xtend',
            description: 'Chống dị hóa cơ, tăng sức bền khi tập luyện.',
            cover: 'https://i.ibb.co/N7XqWnH/bcaa.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-06',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Glutamine',
            description: 'Phục hồi cơ bắp và hệ miễn dịch.',
            cover: 'https://i.ibb.co/vwWwzdT/glutamine.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Pre-workout & Mass Gainer',
        cardOrderIds: ['card-id-07', 'card-id-08', 'card-id-09'],
        cards: [
          {
            _id: 'card-id-07',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Pre-Workout C4 Original',
            description: 'Tăng năng lượng, tập trung và sức bền khi tập.',
            cover: 'https://i.ibb.co/J7fxQNk/preworkout.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-08',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Serious Mass Gainer',
            description: 'Dành cho người gầy khó tăng cân.',
            cover: 'https://i.ibb.co/ykcJZ4M/mass-gainer.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-09',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Fish Oil Omega-3',
            description: 'Hỗ trợ tim mạch & giảm viêm cơ bắp.',
            cover: 'https://i.ibb.co/h7bJqg0/fish-oil.jpg',
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      }
    ]
  }
}
