/**
 * Mock Data cho trang bán thực phẩm chức năng Gym
 * Author: Bạn 😎
 */
import mass from '~/assets//mass.png'
export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Supplement Store',
    description: 'Các loại thực phẩm chức năng cho Gymer',
    type: 'public',
    ownerIds: [],
    memberIds: [],
    columnOrderIds: ['column-id-01', 'column-id-02', 'column-id-03','column-id-04'],
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
            cover: mass,
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
            cover: '',
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
            cover: '',
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
            cover: '',
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
            cover: '',
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
            cover: '',
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
            cover: '',
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
            cover: '',
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
            cover: '',
            memberIds: [],
            comments: [],
            attachments: []
          },
          
        ]
      },
      {
        _id: 'column-id-04',
        boardId: 'board-id-01',
        title: 'Pre-workout & Mass Gainer',
        cardOrderIds: ['column-id-04-placeholder-card'],
        cards: [
          {
            _id: 'column-id-04-placeholder-card',
            boardId: 'board-id-01',
            columnId: 'column-id-04',
            FE_PlaceholderCard: true
          },
        ]
      }
    ]
  }
}
