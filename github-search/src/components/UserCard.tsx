interface UserCardProps {
  login: string;
  avatar_url: string;
}

export function UserCard({ login, avatar_url }: UserCardProps) {
  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">GitHub User Name</div>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={avatar_url} alt={login} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xl font-medium">{login}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

