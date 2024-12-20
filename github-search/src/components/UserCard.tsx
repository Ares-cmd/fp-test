interface UserCardProps {
  login: string;
  avatar_url: string;
}

export function UserCard({ login, avatar_url }: UserCardProps) {
  return (
    <div className="w-full shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between space-x-2">
          <div >
            <div className="text-sm text-gray-500 mb-2">User Image</div>
            <div className="w-24 h-24 overflow-hidden">
              <img src={avatar_url} alt={login} className="w-full h-full object-cover" />
            </div>
          </div>
          <div >
            <div className="text-sm text-gray-500 mb-2">GitHub User Name</div>
            <div>
              <p className="text-xl font-medium">{login}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

